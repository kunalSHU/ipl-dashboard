package com.valorant.ipl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class IplApplication {

//    @Autowired
//    private Sample sample;


    public static void main(String[] args) {
        
        SpringApplication.run(IplApplication.class, args);
    }

//    @EventListener(ApplicationReadyEvent.class)
//    public void listen() {
//        sample.setTestField("e");
//        System.out.println("Execute listen method");
//        System.out.println(sample.getTestField());
//    }

//    @Bean
//    public ServletWebServerFactory servletContainer() {
//        // Enable SSL Traffic
//        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
//            @Override
//            protected void postProcessContext(Context context) {
//                SecurityConstraint securityConstraint = new SecurityConstraint();
//                securityConstraint.setUserConstraint("CONFIDENTIAL");
//                SecurityCollection collection = new SecurityCollection();
//                collection.addPattern("/*");
//                securityConstraint.addCollection(collection);
//                context.addConstraint(securityConstraint);
//            }
//        };
//
//        // Add HTTP to HTTPS redirect
//        tomcat.addAdditionalTomcatConnectors(httpToHttpsRedirectConnector());
//
//        return tomcat;
//    }
//
//    /*
//    We need to redirect from HTTP to HTTPS. Without SSL, this application used
//    port 8080. With SSL it will use port 8443. So, any request for 8082 needs to be
//    redirected to HTTPS on 8443.
//     */
//    private Connector httpToHttpsRedirectConnector() {
//        Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
//        connector.setScheme("http");
//        connector.setPort(8081);
//        connector.setSecure(false);
//        connector.setRedirectPort(8443);
//        return connector;
//    }

}
