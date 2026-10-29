# Build the Java Servlet WAR with a supported long-term Java version.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY java/pom.xml ./pom.xml
COPY java/src ./src
RUN mvn --batch-mode --no-transfer-progress clean package -DskipTests

# Run the WAR on Tomcat 11. The hosting platform's PORT is respected.
FROM tomcat:11-jdk21-temurin
ENV CATALINA_OPTS="-Xms128m -Xmx512m"
COPY --from=build /build/target/green-campus.war /usr/local/tomcat/webapps/green-campus.war
EXPOSE 8080
CMD ["sh", "-c", "sed -i \"s/port=\\\"8080\\\"/port=\\\"${PORT:-8080}\\\"/\" \"$CATALINA_HOME/conf/server.xml\" && catalina.sh run"]
