FROM openjdk:11
COPY . .
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} ipl-backend.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "ipl-backend.jar"]