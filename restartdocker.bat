
@if "%1"=="/?" goto usage

@docker kill bs_sec_1
@docker rm bs_sec_1

@if "%1"=="-d" goto rundaemon

docker run -t -i -p 20000:20000 --name bs_sec_1 bs_sec

@goto end

:rundaemon
docker run -t -d -i -p 20000:20000 --name bs_sec_1 bs_sec
@goto end

:usage
@echo restartdocker.bat /?    usage help
@echo restartdocker.bat -d    run as daemon

:end