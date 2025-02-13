package com.valorant.ipl.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.valorant.ipl.constants.IplConstants;
import com.valorant.ipl.exception.TeamNotFoundException;
import com.valorant.ipl.model.Match;
import com.valorant.ipl.repository.MatchRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public List<Match> getMatchesList(final String teamName) {

        List<Match> matchesTeam1 = new ArrayList<>();
        List<Match> matchesTeam2 = new ArrayList<>();

        log.info("In get matches list method");

        if (!matchRepository.findByTeam1(teamName).isEmpty()) { // implies team2 is valid too
            matchRepository.findByTeam1(teamName).forEach(match -> matchesTeam1.add(match));
            matchRepository.findByTeam2(teamName).forEach(match -> matchesTeam2.add(match));
        } else {
            throw new TeamNotFoundException(IplConstants.TEAM_NAME_NOT_FOUND);
        }

        List<Match> allMatches = Stream.concat(matchesTeam1.stream(), matchesTeam2.stream()).collect(Collectors.toList());

        // sorts matches by date, top 3 latest played matches
        Comparator<Match> com = (o1, o2) -> {
            if (o1.getDate().compareTo(o2.getDate()) < 0) {
                return 1;
            } else {
                return -1;
            }
        };
        allMatches.sort(com);

        List<List<Match>> matchListtest = allMatches.subList(0,3).stream().map(match -> {
            // perform swap
            if (!match.getTeam1().equals(teamName)) {
                String team2 = match.getTeam1();
                match.setTeam1(teamName);
                match.setTeam2(team2);
            }
            return allMatches.subList(0,3);
        }).collect(Collectors.toList());
        System.out.println(matchListtest.toString());

        List<Match> matchList = allMatches.subList(0,3).stream().map(match -> {
           // perform swap
           if (!match.getTeam1().equals(teamName)) {
              String team2 = match.getTeam1();
              match.setTeam1(teamName);
              match.setTeam2(team2);
           }
           return allMatches.subList(0,3);
        }).flatMap(Collection::stream).collect(Collectors.toList());
        return matchList.subList(0,3);
    }


    public static void main (String args[]) {

//        Map<Integer, String> stringStringMap = new HashMap<>();
//        stringStringMap.put(1, "A");
//        stringStringMap.put(2, "B");
//        stringStringMap.put(3, "C");
//
//        Optional<Integer> optionalInteger = stringStringMap.entrySet().stream()
//                 .filter(x -> x.getKey() % 2 == 0)
//                .findFirst()
//                .map(x -> x.getKey());
//        byte b = 127;
//        System.out.println(optionalInteger.get());

//        Pet cat = new Cat();
//        Pet dog = new Dog();
//
//        List<Pet> arrayList = new ArrayList();
//        arrayList.add(cat);
//        arrayList.add(dog);
//        for (Pet pet : arrayList) {
//            pet.makeSound(); //runtime polymorphism, overloading is compile time polymorphism
//        }
//         int memoryConsumed = 0;
//         int dummyArraySize = 15;
//         for (int i = 0; i < Integer.MAX_VALUE; i++) {
//             memoryConsumed += dummyArraySize * Integer.SIZE;
//             System.out.println("memory consumed " + memoryConsumed);
//             dummyArraySize = dummyArraySize * 2;
//             System.out.println("dummy array size " + dummyArraySize);
//         }

        // for loop vs stream lazy evaluation methods
        List<Integer> integerList = Arrays.asList(12,20,35,46,55,68,75);
        List<Integer> newList = new ArrayList<>();

        // return a new array that filters all the numbers divisble by 5 and doubles each number in the array
        // get the first number in the array

        // O(n) -> 7 times
//        for(int i=0; i < integerList.size(); i++) {
//            if(integerList.get(i) % 5 == 0) {
//                newList.add(integerList.get(i) * 2);
//            }
//        }
//        System.out.println(newList.get(0));
//
//
//        //stream way
//        // filter and map are lazy, dont get fully executed right away
//        System.out.println(integerList.stream().filter(MatchService::filterFunction) //12 -> [20]
//                .map(MatchService::mapFunction) //[40]
//                .findFirst()); //40


        Map<String, Integer> map = new HashMap<>();
        String s1 = "meat";
        String s2 = "teem";

        for(int i=0; i < s1.length(); i++) {
            System.out.println(String.valueOf(s1.charAt(i)).hashCode());
            System.out.println(s1.charAt(i));
            System.out.println(map);
            System.out.println(map.containsKey(s1.charAt(i)));
            if(!map.containsKey(String.valueOf(s1.charAt(i)))) { // not in hashmap
                System.out.println("in first if");
                map.put(String.valueOf(s1.charAt(i)), 1);
            } else {
                System.out.println("in second if");
                map.put(String.valueOf(s1.charAt(i)), map.get(String.valueOf(s1.charAt(i))) + 1);
            }
        }
        System.out.println(map);

    }

    private static boolean filterFunction(Integer i) {
        System.out.println("in filter funciton");
        return i % 5 == 0;
    }
    private static Integer mapFunction(Integer i) {
        System.out.println("in map funciton");
        return i*2;
    }
}
