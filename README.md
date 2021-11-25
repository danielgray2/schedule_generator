# schedule_generator

## Introduction
This is a scheduling application that I made during college for a web development class. My team and I decided to take it further than
was necessary, and built a containerized application using Docker Compose. Once we completed the project, we hosted it on AWS.

## To get up and running
- Install Docker on your computer. If you are on Mac, see [this link](https://docs.docker.com/docker-for-mac/install/). If you are on Windows,
  see [this link](https://docs.docker.com/docker-for-windows/install-windows-home/). If you are on Linux, use your package manager to install it for your
  distribution.
- Install npm on your computer. If you are on Mac, see [this link](https://treehouse.github.io/installation-guides/mac/node-mac.html). If you are on Linux, install it via your package manager.
- Install make on your computer. If you are on Mac, you have to have XCode, and if you do, you should be good to go. If not, see [this link](https://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac).
- Clone this repository down.
- Navigate to the `schedule_generator/client/project` directory and run `npm install` to install all of the necessary packages onto your computer.
- Navigate to the `schedule_generator`directory and run `make prod-up`.
- Navigate to http://localhost:3000, and ensure that you see the webpage.
- To quit the application, go back to your home folder in the terminal and press CTRL+C.
