FROM openjdk:11
COPY . .
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} ipl-backend.jar
ENTRYPOINT ["java", "-jar", "/ipl-backend.jar"]