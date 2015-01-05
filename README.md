# Job Seeker Web App

This app is used as the rest backend for a mobile app of job seeker

For an additional information please refer to the repository  [SimpleDog](https://github.com/LinkedHK/SimpleDog)

## Installation
Before proceed installation please make sure you have ruby on rails framework version >= 4.0.
------------------------

    cd my/project
    git clone https://github.com/LinkedHK/RakeJ.git
    cd RakeJ
    bundle install

The installation may fall in the windows environment due to an error of the `mysql2` gem installation.
In order to fix this issue please follow to the solution suggested by [brianmario](https://github.com/brianmario/mysql2)

Edit a db config file  at `config/database.yml`

Generate sample data using command `rake db:custom_seed`

## License

[Apache Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

P.S I highly doubt that someone would find this project helpful/interesting :)


