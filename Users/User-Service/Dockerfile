# Use the official WildFly image as a base
FROM jboss/wildfly:latest

# Copy your WildFly configurations or deployments
COPY target/User-Service-1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/

# Add any additional configuration, libraries, etc.
COPY standalone.xml /opt/jboss/wildfly/standalone/configuration/standalone.xml

# Expose the ports WildFly will run on
EXPOSE 8080 9990

# Define the entry point
CMD ["/opt/jboss/wildfly/bin/standalone.bat", "-b", "0.0.0.0"]