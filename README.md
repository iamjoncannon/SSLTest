https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
 
aws ec2 describe-instances --instance-ids i-043f0af76893a3a41

sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node

sudo setcap 'cap_net_bind_service=+ep' `which node`

https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

```js
"deploy-init" : "key=$key addy=$addy pm2 deploy ecosystem.config.js production setup",
```


# Start the SSH agent
eval `ssh-agent -s`
# Add the SSH key
ssh-add

https://gist.github.com/firstdoit/6389682


launch the server at the provided URL in non-secure mode, link 
to that DNS, then shell back

sudo certbot certonly --webroot -w ./ -d ssltest.joncannon.codes

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/ssltest.joncannon.codes/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/ssltest.joncannon.codes/privkey.pem
   Your cert will expire on 2019-07-18. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le


chmod +x /etc/letsencrypt/live/yourdomain.com/privkey.pem
chmod +x /etc/letsencrypt/live/yourdomain.com/cert.pem
chmod +x /etc/letsencrypt/live/yourdomain.com/chain.pem