module.exports = {
	apps : [
		{
				name: "rumpeldev",
				script: "./server.js",
				watch: true,
				autorestart: true,
				env: {
						"DBUSER":"secret_DBUSER",
						"DBPASSWORD": "secret_DBPASSWORD",
						"DBURL": "secret_DBURL",
						"DBPORT": secret_DBPORT,
						"DBNAME": "secret_DBNAME"
				}
		}
	]
}
