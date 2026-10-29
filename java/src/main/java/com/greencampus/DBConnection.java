package com.greencampus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * MySQL connection configuration.
 *
 * Local defaults are retained for the existing local Tomcat setup.
 * Cloud deployments should set GREEN_CAMPUS_DB_URL, GREEN_CAMPUS_DB_USER,
 * and GREEN_CAMPUS_DB_PASSWORD in the hosting provider's secret settings.
 */
public final class DBConnection {
    private static final String DEFAULT_URL =
            "jdbc:mysql://localhost:3306/green_campus?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    private static final String URL =
            getSetting("GREEN_CAMPUS_DB_URL", "green.campus.db.url", DEFAULT_URL);
    private static final String USER =
            getSetting("GREEN_CAMPUS_DB_USER", "green.campus.db.user", "root");
    private static final String PASSWORD =
            getRequiredPassword();

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new ExceptionInInitializerError(
                    "MySQL JDBC Driver not found. Check the Maven dependencies."
            );
        }
    }

    private DBConnection() {
    }

    private static String getSetting(String environmentName,
                                     String propertyName,
                                     String fallback) {
        String property = System.getProperty(propertyName);
        if (property != null && !property.isBlank()) {
            return property.trim();
        }

        String environment = System.getenv(environmentName);
        if (environment != null && !environment.isBlank()) {
            return environment.trim();
        }

        return fallback;
    }

    private static String getRequiredPassword() {
        String property = System.getProperty("green.campus.db.password");
        if (property != null && !property.isBlank()) {
            return property;
        }

        String environment = System.getenv("GREEN_CAMPUS_DB_PASSWORD");
        if (environment != null && !environment.isBlank()) {
            return environment;
        }

        throw new IllegalStateException(
                "MySQL password not configured. Set GREEN_CAMPUS_DB_PASSWORD "
                + "or -Dgreen.campus.db.password."
        );
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
