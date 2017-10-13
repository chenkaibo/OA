
@docker build -t bs_sec ./
@if exist bs_sec.tar del /q bs_sec.tar
@docker save bs_sec>bs_sec.tar
@if exist bs_sec.tar.gz del /q bs_sec.tar.gz
@7z a -tgzip bs_sec.tar.gz bs_sec.tar
