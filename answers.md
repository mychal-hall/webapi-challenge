- [ ] Mention two parts of Express that you learned about this week.
        it's a framwork that sits atop node.js. It can use routing to partition applications

- [ ] Describe Middleware?
        A function that has access to req and res in the req-res cycle. They sit in the  middle between a client reqeust and a server response.
        They can execute any code, make changes to the req and res objects.
        Call the next middleware. They can also be considered add-ons for express, making it better.

- [ ] Describe a Resource?
        A resource is where we store data? Things like a bunch of projects or actions. We can then tap those resources.

        Resources are our migrations and such. Not necessarily the database but the are the things that make up the data. (ie. name)

- [ ] What can the API return to help clients know if a request was successful?
        Status Codes (200, 201) and JSON messages

- [ ] How can we partition our application into sub-applications?
        Routers
        