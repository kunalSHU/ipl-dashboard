package com.valorant.ipl.batchprocessing;

import com.valorant.ipl.data.MatchFromCSV;
import com.valorant.ipl.model.Match;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

/**
 * 1. Read from input.
 * 2. Process the input from the processor class.
 * 3. Write to output object.
 */
@Configuration
public class BatchConfiguration {

    private final String[] FIELD_NAMES = {"id","city","date","player_of_match","venue","neutral_venue","team1","team2","toss_winner","toss_decision","winner","result","result_margin","eliminator","method","umpire1","umpire2"};

    @Bean
    public FlatFileItemReader<MatchFromCSV> reader() {
        return new FlatFileItemReaderBuilder<MatchFromCSV>()
                .name("MatchItemReader")
                .resource(new ClassPathResource("match-data.csv"))
                .delimited()
                .names(FIELD_NAMES)
                .targetType(MatchFromCSV.class)
                .build();
    }

    @Bean
    public MatchInputProcessor processor() {
        return new MatchInputProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<Match> writer(DataSource dataSource) {
        System.out.println("Inside writer");
        return new JdbcBatchItemWriterBuilder<Match>()
                .sql("INSERT INTO match (id,city,date,player_of_match,venue,team1,team2,toss_winner,toss_decision,match_winner,result,result_margin,umpire1,umpire2)" +
                        " VALUES (:id,:city,:date,:playerOfMatch,:venue,:team1,:team2,:tossWinner,:tossDecision,:matchWinner,:result,:resultMargin,:umpire1,:umpire2)")
                .dataSource(dataSource)
                .beanMapped()
                .build();
    }

    @Bean
    public Job importUserJob(JobRepository jobRepository, JobCompletionNotificationListener listener, Step step1) {
        return new JobBuilder("importUserJob", jobRepository)
                .listener(listener)
                .start(step1)
                .build();
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new JpaTransactionManager();
    }

    @Bean
    public Step step1(JobRepository jobRepository, PlatformTransactionManager transactionManager,
                      FlatFileItemReader<MatchFromCSV> reader, MatchInputProcessor processor, JdbcBatchItemWriter<Match> writer) {
        System.out.println("IN step1 builder");
        return new StepBuilder("step1", jobRepository)
                .<MatchFromCSV, Match> chunk(10, transactionManager)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .allowStartIfComplete(true)
                .build();
    }
}
