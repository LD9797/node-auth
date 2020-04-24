# node-auth

## curl

''' sh 

curl -X POST localhost:3000/register -H 'Content-type: application/json' -d '{"email": "alex@gmail.com", "name": "alex", "password": "secrect12", "passwordConfirmation": "secrect12" }'

'''

sudo docker exec -it nodeauth_db_1 mongo -u admin -p secret auth
sudo docker exec -it nodeauth_cache_1 redis-cli -a secret

