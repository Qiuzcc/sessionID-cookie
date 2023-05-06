// 这里保存的是敏感的密钥信息，理论上来说是不能公开的，不过这里的密钥公开了也没什么大碍，而且运行需要，所以就没有将该文件添加到.gitignore中
var SESSION_SECRET = 'session ID cookie secret'

module.exports = { SESSION_SECRET }