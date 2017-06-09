FROM node:6

# Install google chrome, it will be use to run units and e2e tests
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y \
      xvfb \
      google-chrome-stable \
  && rm -rf /var/lib/apt/lists/*

# Set local node_modules binaries directly available
RUN echo "PATH=$PATH:/app/node_modules/.bin" >> /root/.bashrc
ENV TRAVIS 1

WORKDIR /app
