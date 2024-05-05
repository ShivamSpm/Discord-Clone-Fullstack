<p align="center">
 <a> <img height=200px src="./public/logo.png" alt="Discord Logo"> </a>
</p>

<h1 align="center">Discord Clone Full Stack Web App</h1>
<div align="center">
     <h4 align="center">This project is a full stack Discord clone built using Next.js (Typescript), styled with Tailwind CSS, and incorporates real-time communication features via Socket.io. It leverages Prisma as an ORM for PostgreSQL to handle database operations, creating a robust and interactive chat application.
     </h4><br/>
     <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/><img  
       src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/> <img 
       src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img 
       src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/> <img 
       src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/><br/>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/>
</div>

-----------------------------------------
### Overview
The Discord clone is designed to simulate the core functionalities of the popular chat service, Discord. It features user authentication, real-time messaging, and dynamic channel management. The application is built using Next.js, a React framework, which facilitates server-side rendering and static site generation to enhance performance and SEO. Tailwind CSS is used for its utility-first approach to design, allowing for rapid and responsive UI development.

-----------------------------------------

### Features

* User Authentication: Secure login and registration functionality using Clerk.
* Real-Time Messaging: Users can send and receive messages instantly with Socket.io.
* Channel Management: Users can create, join, and manage channels with voice and video functionality
* Responsive Design: Utilizing Tailwind CSS and shadcn/ui components for a flexible and adaptive user interface.

-----------------------------------------

### Implementation
* Frontend: Built with Next.js and TypeScript, leveraging the powerful features of React for component-based architecture. Tailwind CSS provides a flexible styling framework that adapts to various device screens.
* Backend: Utilizes Prisma as an ORM to interact with a PostgreSQL database, managing data persistence for user information, messages, and channel details. Server-side logic is handled in Next.js API routes, providing a clear separation of concerns and streamlined data handling.
* Real-Time Features: Socket.io is used to establish a WebSocket connection between the users, enabling real-time bidirectional event-based communication. This allows the app to instantly update all clients when messages are sent or channels are updated. Livekit is used for voice and video communications. It is an open source project that provides scalable, multi-user conferencing based on WebRTC.

-----------------------------------------

### Challenges Faced
* **Real-Time Data Management:** Implementing real-time communication while ensuring data consistency across clients was challenging. Socket.io was utilized to manage websockets for live data transmission but required careful state management to sync with the UI updates.
* **Scalable Database Design:** Designing a database schema that supports complex queries efficiently while maintaining fast response times for a growing number of users and messages. Prisma and PostgreSQL were key in managing relationships and ensuring integrity.
* **Authentication and Security:** Implementing a secure authentication system that protects user data and prevents unauthorized access was critical. The system integrates with Next.js API routes to handle secure sessions and user authentication.


### Screenshots
