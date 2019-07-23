

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
 
aws ec2 describe-instances --instance-ids i-043f0af76893a3a41



sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node

sudo setcap 'cap_net_bind_service=+ep' `which node`

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

https://gist.github.com/firstdoit/6389682

launch the server at the provided URL in non-secure mode, link 
to that DNS, then shell back

sudo certbot certonly --dry-run --webroot -w ./server -d ssltest.joncannon.codes

