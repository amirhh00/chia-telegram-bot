# chia-telegram-bot (not working yet)

a telegram bot designed for chia farmer running on raspberry pi and get farm stats via telegram bot behind tor proxy <br />
this bot can talk to chia, installed on raspberry pi 4 from docker container using ssh <br />

# how to use:

- first install docker on rpi 4 <br />
- then install chia on rpi <br />
- add your .env file using .env.example file <br />
- ssh-keygen on either rpi or chia-bot_node docker container <br />
- copy private and public key in .ssh directory in project root <br />
- edit .ssh/config file and change private key fileName <br />
- copy .pub contents to rpi's authorized-keys file in ~/.ssh <br />
- run docker-compose up -d --build <br />
