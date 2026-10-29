# 🌱 Green Campus Sustainability Analytics Portal

<!-- ![Campus sustainability banner](https://upload.wikimedia.org/wikipedia/commons/6/61/Campus-solar.jpg) -->

*An overview of a web-based project for understanding campus sustainability indicators, environmental conditions, and resource usage.*

![HTML5](https://img.shields.io/badge/HTML5-Structure-E76F00?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-Responsive%20Design-1572B6?logo=css3&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-UI%20Design-7952B3?logo=bootstrap&logoColor=white) ![JavaScript ES6](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=111111) ![Java](https://img.shields.io/badge/Java-Backend-ED8B00?logo=openjdk&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)

## 🌍 Project at a Glance

The **Green Campus Sustainability Analytics Portal** is an academic web application concept that brings important campus sustainability information together in one place. It focuses on the relationship between everyday resource consumption, environmental conditions, and sustainability indicators.

The project brings together responsive website design, form validation, weather information, graphical presentation of environmental data, database-backed record management, structured XML data, and a Java Servlet-based web backend. Its overall purpose is to demonstrate how web technologies can support better visibility into campus sustainability.

> **Project status:** This document describes the project's overall scope and intended capabilities. Individual features should be considered complete only after they have been checked in the actual application and tested in the intended environment.

> **Deployment note:** GitHub Pages serves the static frontend only. See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for the corrected live-metrics integration, environment-based database configuration, and the steps required to host the Java/Tomcat backend publicly.

## 🎯 Problem Statement

Universities and campuses use electricity, water, and other resources every day. Waste management and environmental conditions also affect a campus's sustainability performance. When this information is scattered across different records or systems, it can be difficult to view the overall picture, compare indicators, or communicate findings clearly.

This project explores how a central web portal can organise sustainability information and present it in a format that is easier for users to understand.

## 💡 Proposed Solution

The portal provides a single web-based interface for sustainability metrics and related records. It is designed to combine clear screens and forms with input validation, persistent data management, and visual context from weather information. The Java backend and MySQL database form the intended data-management layer, while XML and its validation definitions demonstrate structured data representation.

## 🌿 Main Project Objectives

- Bring campus sustainability indicators and related records into one organised portal.
- Present information through a responsive, easy-to-navigate user interface.
- Provide registration and login screens as part of the intended user workflow.
- Reduce common form-entry errors through input validation.
- Show how weather conditions can be displayed alongside sustainability information.
- Demonstrate the management of resource, consumption, and sustainability records.
- Demonstrate structured sustainability data using XML, DTD, and XSD.
- Connect a web interface to backend services and a relational database.
- Build practical experience with frontend, backend, database, and data-validation technologies.

## ✨ Key Areas of the Portal

| Area | Overview |
|---|---|
| 🌱 Sustainability metrics | Organises indicators related to campus electricity, water, waste, and other sustainability measures. The exact indicators depend on the data provided by the project. |
| 💧 Resource management | Represents resources tracked by the campus and supports the intended creation, viewing, updating, and removal of records. |
| ⚡ Consumption records | Organises resource-consumption information so it can be reviewed as part of sustainability reporting. |
| 📊 Reports and visual presentation | Shows a live metrics panel populated from the Java Servlet API when the backend and MySQL database are configured; charts provide additional environmental context. |
| 🌦️ Weather context | Uses the intended external weather-data integration to provide environmental context for the displayed information. Weather access depends on an internet connection and the external service being available. |
| 👤 User access | Includes registration and login as part of the project's intended user-facing workflow. Authentication and access controls require end-to-end testing. |
| ✅ Form validation | Helps users identify missing or incorrectly formatted information before submitting a form. Browser-side validation does not replace backend validation. |
| 🗃️ Data storage | Uses the intended Java, JDBC, and MySQL layer to store and manage application records. |
| 🧩 Structured data | Uses XML as a way to represent sustainability records and demonstrates validation with DTD and XSD definitions. |
| 🔌 Web backend | Uses Java Servlets as the intended HTTP request-processing layer for configured application operations. |

## 🏛️ Who Is the Project For?

The project is intended for academic demonstrations and for exploring how campus sustainability information can be organised. Potential users and beneficiaries include:

- **Students**, who can explore sustainability indicators and learn about environmental data.
- **Campus administrators and facilities teams**, who could use organised records to review resource usage when appropriate data and reporting are available.
- **Sustainability coordinators**, who could use metric summaries to support discussions about campus environmental performance.
- **Project evaluators and developers**, who can review how a multi-layer web application combines interface design, validation, data management, and external information.

These are intended use cases, not a claim that every role or permission system is already implemented.

## 🧭 How the Project Fits Together

The project is organised around four connected layers:

1. **User interface:** HTML, CSS, and Bootstrap provide the page structure, layout, and responsive presentation.
2. **Browser interactions:** JavaScript supports form behaviour, client-side validation, external weather requests, and graphical updates where those features are configured.
3. **Application services:** Java Servlets are intended to receive web requests and coordinate backend operations.
4. **Data and validation:** MySQL stores application records through the Java database layer, while XML, DTD, and XSD demonstrate a separate structured-data and validation component.

Weather data follows a separate external-service path: the browser requests information from a weather provider and presents the returned data when the request succeeds. The browser should not connect directly to the MySQL database.

## 🧪 Academic Experiments and Learning Outcomes

The project is divided into seven learning areas. Together, they show how a sustainability-focused web application can grow from a simple responsive page into a system with browser interactions, structured data, and backend integration.

### 🖥️ Experiment 1 — Responsive Web Application

Creates the initial portal experience with HTML and CSS3. The focus is on page structure, readable content, navigation, forms, and layouts that adapt to different screen sizes using Flexbox and CSS Grid.

**Learning outcome:** Understand the foundations of a responsive website.

### 📱 Experiment 2 — Bootstrap-Based Interface

Applies Bootstrap's grid, components, and utility classes to improve consistency and responsiveness across pages and screen sizes.

**Learning outcome:** Understand how a UI framework can speed up interface development and maintain a consistent design.

### 🛡️ Experiment 3 — Client-Side Form Validation

Introduces browser-side checks for required information, email formats, input length, and consistency between related fields. The aim is to give users clearer feedback and prevent avoidable form errors.

**Learning outcome:** Understand input validation and the importance of validating data again on the server.

### 🌦️ Experiment 4 — ES6 Weather Integration and Charts

Uses modern JavaScript concepts to retrieve weather information from an external service and present environmental conditions graphically. The Reports and Metrics pages also request sustainability metric records from the Java Servlet API, so those records come from MySQL when the backend is deployed and configured.

**Learning outcome:** Understand asynchronous data retrieval, external APIs, and visual interpretation of environmental information.

### ♻️ Experiment 5 — Java CRUD Operations

Covers the intended Create, Read, Update, and Delete operations for resources, consumption records, and sustainability metrics, using Java and database connectivity.

**Learning outcome:** Understand how application records can be managed through a backend and stored in a relational database.

### 🧩 Experiment 6 — XML, DTD, and XSD

Represents resources, consumption records, and sustainability metrics as structured XML data. DTD and XSD are used to describe and validate the expected data structure.

**Learning outcome:** Understand structured data, validation rules, and the role of XML in data exchange.

### 🔌 Experiment 7 — Servlet-Based Controller

Introduces a Java Servlet layer for handling HTTP requests and coordinating operations for the web application. Actual request paths and supported operations depend on the mappings and services present in the project.

**Learning outcome:** Understand how a browser-based application communicates with backend services.

## 🧰 Technology Overview

| Technology | Role in the project |
|---|---|
| HTML5 | Structures the pages and the content users see. |
| CSS3, Flexbox, and CSS Grid | Define visual presentation and responsive layouts. |
| Bootstrap | Provides reusable responsive layout patterns and interface components. |
| JavaScript ES6+ | Supports browser interactions, validation, external data requests, and charts. |
| Open-Meteo or another configured weather provider | Supplies weather information for the intended weather feature. The provider actually configured in the current project should be confirmed. |
| Chart.js, where configured | Supports graphical presentation of retrieved data. |
| Java and Jakarta Servlet API | Support the intended application backend and HTTP request handling. |
| JDBC and MySQL Connector/J | Provide the connection between Java application logic and MySQL. |
| MySQL | Stores structured application records. |
| Apache Maven | Manages Java project dependencies and the application build. |
| Apache Tomcat | Hosts the Servlet-based Java web application. |
| XML, DTD, and XSD | Represent and validate structured sustainability data. |

## 📈 Sustainability Topics Represented

The portal's subject area includes several common aspects of campus sustainability:

- **Electricity and energy:** consumption and related energy indicators.
- **Water:** water usage and resource tracking.
- **Waste:** waste-related records and recycling indicators where data is available.
- **Environmental conditions:** weather context that may help explain changes in outdoor conditions.
- **Sustainability reporting:** presenting selected indicators in an organised form for review.

The quality of any analysis depends on the accuracy, completeness, and frequency of the data entered or retrieved. The project does not automatically establish real-world environmental impact unless the relevant data and calculations are implemented and verified.

## 🔄 Intended User Journey

A typical intended journey begins when a user opens the portal and navigates to the relevant sustainability area. The user can enter information through forms, receive validation feedback, and review records or metric summaries. When weather integration is available, environmental information and charts can provide additional context. Backend operations are intended to process supported requests and store applicable records in the database.

The exact screens, endpoints, access permissions, and successful outcomes depend on the features present in the current project version.

## 🔐 Privacy, Security, and Responsible Use

A sustainability portal may include user accounts and campus records, so responsible handling of information is important. The design should keep database credentials out of public-facing pages, validate submitted information on the backend, protect user passwords appropriately, and limit access to sensitive operations. A real deployment should use suitable access controls, secure transport, backups, and a reviewed server configuration.

The project overview does not certify that these controls are complete. They should be reviewed as part of testing before the application is used with real users or sensitive campus information.

## 🌟 Expected Benefits

- **Clearer visibility:** Organises sustainability indicators and related records in one place.
- **Easier interpretation:** Supports visual summaries and charts where configured.
- **Better data quality:** Form validation can reduce simple input mistakes.
- **Connected learning:** Demonstrates frontend, backend, database, external API, and structured-data concepts in one academic project.
- **Extensibility:** Provides a foundation for adding further sustainability measures and reporting features.

## 🚀 Possible Future Enhancements

Future versions could include historical comparisons, more detailed dashboards, downloadable reports, campus or building-level comparisons, role-based access, improved accessibility, richer energy and water metrics, and alerts for unusual consumption patterns. Additional integrations could include verified campus sensor data or other environmental sources. These are potential improvements rather than confirmed current features.

## ✅ How Project Success Can Be Evaluated

The project can be reviewed by checking whether the intended pages are clear and responsive, forms provide useful validation feedback, weather information and charts work when configured, supported record-management actions persist correctly, XML documents pass their declared validation rules, and Servlet requests behave as intended. Security, accessibility, error handling, and the accuracy of sustainability data should also be considered.

## 🖼️ Visual Theme and Image Credit

The visual theme uses nature-inspired symbols—leaves, water, energy, weather, analytics, and databases—to make each project area easy to recognise. The campus solar image at the top is illustrative and is not evidence of the project's own campus or installations. Image source: [Wikimedia Commons — Campus-solar.jpg](https://commons.wikimedia.org/wiki/File:Campus-solar.jpg). The technology badges are visual references to the technologies discussed in this overview.

## 🌎 Conclusion

The **Green Campus Sustainability Analytics Portal** is a multi-part academic project focused on presenting campus sustainability information through a modern web interface. Its scope connects responsive design, form validation, weather context, data visualisation, Java-based record management, MySQL storage, XML validation, and Servlet-based backend processing.

The overall goal is to demonstrate how web technologies can help organise and communicate sustainability information while providing practical experience across the main layers of a web application.
