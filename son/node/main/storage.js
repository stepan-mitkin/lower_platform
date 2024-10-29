prop()

folder = os.homedir()
fullname = path.join(folder, "." + appPackage.name)
await makeDirIfNotExist(fullname)
quota = 50 * 1024 * 1024
return new LocalStorage(fullname, quota)