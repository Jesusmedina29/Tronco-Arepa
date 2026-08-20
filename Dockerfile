# Build stage
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY tronco-arepa-backend/.mvn/ .mvn/
COPY tronco-arepa-backend/mvnw tronco-arepa-backend/pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw -B dependency:go-offline

COPY tronco-arepa-backend/src/ src/
RUN ./mvnw -B clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 10000

ENTRYPOINT ["java", "-jar", "app.jar"]
