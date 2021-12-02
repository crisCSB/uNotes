const executeConfiguration = require('./appConfiguration.js');
executeConfiguration();

const mySQL_action = require('./mySQL_action.js');

const executeRouteConfiguration = require('./routeConfiguration.js');
executeRouteConfiguration(mySQL_action);


app.listen(port, console.log(`Server is running on port ${port}`));