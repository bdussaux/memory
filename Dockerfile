# On part de l'image officiel de php 7 avec apache
FROM php:7.0-apache
 
# On installe le module PDO MySQL
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli
 
RUN echo "ServerName localhost"  >> /etc/apache2/apache2.conf

# Activation de mod_rewrite d'Apache 
RUN a2enmod rewrite