@ECHO OFF
SET NO_HOME_PATH_DEFINED=ADD_YOUR_PUBLIC_URI_HERE
SET HOME_PATH=%NO_HOME_PATH_DEFINED%
SET FILES_LIST=fileindex.html

@ECHO DROPBOX Files List - devised and developed by Thom Parkin (Nov 2010)
@ECHO Freely distributed and available to all who may find it useful
@ECHO.
@ECHO Each time you add or change a file in your PUBLIC Dropbox folder, simply run %0 and
@ECHO a file will be created/updated named: %FILES_LIST% containing a complete list of all files

if %HOME_PATH% == %NO_HOME_PATH_DEFINED% goto NEEDURI
del /F /Q %FILES_LIST%
echo ^<html^>^<head^>^<title^>%HOME_PATH% file list^</title^>^</head^>^<body^>^<h1^>Dropbox Files Listing^</h1^> >> %FILES_LIST%
for %%9 in (*.*) do echo ^<a href="%HOME_PATH%/%%9"^>%%9^</a^>^<br \^> >> %FILES_LIST%

echo ^<br /^>^<p^>Developed by ^<a href="mailto:uddh@websembly.com&subject=Your Dropbox Files List is pure genius!"^>Thom Parkin^</a^>, Nov. 2010^</p^> >> %FILES_LIST%
echo ^</body^>^</html^> >> %FILES_LIST%
exit

:NEEDURI
@ECHO.
@ECHO YOU MUST EDIT %0 AND ADD YOUR DROPBOX PUBLIC URI.
@ECHO For Example:
@ECHO SET HOME_PATH=http://dl.dropbox.com/u/0000000/
pause
notepad.exe %0