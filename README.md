
 
aws ec2 describe-instances --instance-ids i-043f0af76893a3a41


sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node

sudo setcap 'cap_net_bind_service=+ep' `which node`

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca