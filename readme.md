# node-auth

## curl

''' sh 

curl -X POST localhost:3000/register -H 'Content-type: application/json' -d '{"email": "alex@gmail.com", "name": "alex", "password": "secrect12", "passwordConfirmation": "secrect12" }'


curl -v -X POST localhost:3000/register -H 'Content-type: application/json' -d '{"email": "alex@gmail.com", "name": "alex", "password": "Secrect12", "passwordConfirmation": "Secrect12" }'


curl -v -X POST localhost:3000/login -H 'Content-Type: application/json' -d '{"email":"alex@gmail.com","password":"Secrect12"}' -- cookie 'sid=s%3AjeA-35rHd9b-AIEjKqL7TXt9vTXnr1uo.Hp%2BxinyRiZKd2UPk%2BHg3qJXXiwDPvrC%2FdZQZ0n7NEmU'



'''

sudo docker exec -it nodeauth_db_1 mongo -u admin -p secret auth
sudo docker exec -it nodeauth_cache_1 redis-cli -a secret
sudo docker exec -it nodeauth_cache_1 redis-cli -a secret flushall

