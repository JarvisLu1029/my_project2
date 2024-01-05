FROM python:3.11
LABEL maintainer="Jarvis"
RUN apt update
RUN apt upgrade -y
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb || apt-get install -f -y
RUN dpkg -i google-chrome-stable_current_amd64.deb
RUN pip install --upgrade pip
COPY requirements.txt ./
# 自行建立更新清單 不要使用快取目錄(會下載最新版本的套件)
RUN pip install --no-cache-dir -r requirements.txt