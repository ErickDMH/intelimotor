# intelimotor

Demo application to create a publication on seminuevos.com. This project consists of two parts API and Client. API is a REST API that creates a publication on the website with the specifications provided and returns a screenshot of this to the client. The client is an SPA (Single Page Application) that consumes the API and provides a user interface to create the publication only providing price and description.

## Start the services

- Via terminal
    For this method, we need two terminal windows. One for the API and the other for the client, assuming both are on the project root folder.
    1. API ( localhost:4500 )
        > cd API/
        > node index.js
    2. Client ( localhost:3000 )
        > cd Client/
        > npm run dev
- Using VS Code "Run and Debug"
    On the sidebar action dropdown this will contain "Launch Client via NPM" and "Launch API via NPM". You can run both simultaneously or one at a time and keep control of them on the "Call Stack" section.
