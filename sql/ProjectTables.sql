DROP DATABASE IF EXISTS gameusers;
CREATE DATABASE gameusers;

use gameusers;

CREATE TABLE users
(
  userid             INT            PRIMARY KEY   AUTO_INCREMENT,
  userName     VARCHAR(50)    NOT NULL,
  pass        VARCHAR(50)    NOT NULL,
  Unique(userName)
);

CREATE TABLE champions
(
  champid             INT            PRIMARY KEY   AUTO_INCREMENT,
  champion_name	      VARCHAR(50)    NOT NULL,
  lane		          VARCHAR(50)    NOT NULL,
  damagetype		  VARCHAR(20)	 Not NULL,
  releasedate		  date           Not NULL,
  unique(champion_name)
);

CREATE TABLE lolmatch
(
  usermatchid           INT            PRIMARY KEY   AUTO_INCREMENT,
  username     			VARCHAR(50)    NOT NULL,
  champion			    VARCHAR(50)    NOT NULL,
  kills		      		INT            NOT NULL,
  deaths	       		INT            NOT NULL,
  assists	      		INT            NOT NULL,
  towersDestroyed	    INT 		   NOT NULL,
  result				VARCHAR(5)	   NOT NULL,
  lane			    	VARCHAR(50)    NOT NULL,		
CONSTRAINT lolmatch_fk_usernames
    FOREIGN KEY (username)
    REFERENCES users (userName),
    CONSTRAINT lolmatch_fk_champnames
    FOREIGN KEY (champion)
    REFERENCES champions (champion_name)
);

CREATE TABLE loluserstats
(
  username     			VARCHAR(50)    NOT NULL,
  champion			    VARCHAR(50)    NOT NULL,
  totkills				INT			   NOT NULL,
  totdeaths				INT 		   NOT NULL,
  totassists			int			   NOT NULL,
  tottowersDestroyed	INT 		   NOT NULL,
  totwins				INT			   NOT NULL,
  totlosses				INT			   NOT NULL,
  primary key (username, champion),
  CONSTRAINT lolustats_fk_users
    FOREIGN KEY (username)
    REFERENCES users (userName),
    CONSTRAINT lolustats_fk_champnames
    FOREIGN KEY (champion)
    REFERENCES champions (champion_name)
);

CREATE TABLE lolchampstats
(
  champion			    VARCHAR(50)    NOT NULL,
  lane			    	VARCHAR(50)    NOT NULL,
  totkills				INT			   NOT NULL,
  totdeaths				INT			   NOT NULL,
  totassists			INT			   NOT NULL,
  totwins				INT			   NOT NULL,
  totlosses				INT			   NOT NULL,
  PRIMARY KEY (champion, lane),
  CONSTRAINT champstats_fk_champs
    FOREIGN KEY (champion)
    REFERENCES champions (champion_name)
);

CREATE TABLE owheros (
  heroid              INT            PRIMARY KEY   AUTO_INCREMENT,
  hero_name		      VARCHAR(50)    NOT NULL,
  drole		          VARCHAR(50)    NOT NULL,
  ultimateability	  VARCHAR(50)	 Not NULL,
  eability			  VARCHAR(50)	 Not NULL,
  shiftability		  VARCHAR(50)	 Not NULL,
  releasedate		  date           Not NULL,
  unique(hero_name)
);

CREATE TABLE owmatch
(
  owusermatchid         INT            PRIMARY KEY   AUTO_INCREMENT,
  username              VARCHAR(50)            NOT NULL,
  hero			    	VARCHAR(50)    NOT NULL,
  lasthits		      	INT            NOT NULL,
  deaths	       		INT            NOT NULL,
  eliminations	      	INT            NOT NULL,
  gametype			    VARCHAR(40)    NOT NULL,
  medals				INT 		   NOT NULL,
  result				VARCHAR(5)	   NOT NULL,
  CONSTRAINT owmatch_fk_users
    FOREIGN KEY (username)
    REFERENCES users (userName),
  CONSTRAINT owmatch_fk_heroes
    FOREIGN KEY (hero)
    REFERENCES owheros (hero_name)
);

CREATE TABLE owuserstats
(
  username              VARCHAR(50)            NOT NULL,
  hero				    VARCHAR(50)    NOT NULL,
  elims					decimal        	   NOT NULL,
  deaths				decimal 		   NOT NULL,
  medals				decimal			NOT NULL,
  totwins				INT			   NOT NULL,
  totlosses				INT			   NOT NULL,
  primary key (username, hero),
  CONSTRAINT owustats_fk_users
    FOREIGN KEY (username)
    REFERENCES users (userName),
  CONSTRAINT owustats_fk_heros
    FOREIGN KEY (hero)
    REFERENCES owheros (hero_name)
);


insert into users (username, pass)values
('davy', 'applepear32'),
('alex', 'blackbear2'),
('ricky441', 'turnabout21'),
('chris1337', 'turnips43');


insert into champions (champion_name, lane, damagetype, releasedate) values
('Aatrox', 'Top', 'AD', '2013-06-13'),
('Master Yi', 'Jungle', 'AD', '2009-02-21'),
('Annie', 'Mid', 'AP', '2009-02-21'),
('Sivir', 'ADC', 'AD', '2009-02-21'),
('Morgana', 'Support', 'AP', '2009-02-21'),
('Ryze', 'Mid', 'AP', '2009-02-21'),
('Kayle', 'Top', 'AP', '2009-02-21'),
('Tristana', 'ADC', 'AD', '2009-02-21'),
('Warwick', 'Jungle', 'AD', '2009-02-21'),
('Zilean', 'Support', 'AP', '2009-02-21'),
('Sion', 'Top', 'AD', '2009-02-21');



insert into owheros (hero_name, drole, ultimateability, eability, shiftability, releasedate) values 
('D VA', 'Tank', 'Self-Destruct', 'Micro Missiles', 'Boosters', '2016-05-24'),
('Tracer', 'Damage', 'Pulse Bomb',  'Recall', 'Blink', '2016-05-24'),
('Reaper', 'Damage', 'Death Blossom', 'Shadow Step', 'Wraith Form', '2016-05-24'),
('Widowmaker', 'Damage', 'Infra-Sight', 'Venom Mines', 'Grappling Hook', '2016-05-24'),
('Pharah', 'Damage', 'Barrage',  'Concussive Blast', 'Jump Jet', '2016-05-24'),
('Mercy', 'Support', 'Valkyrie', 'Resurrect', 'Guardian Angel', '2016-05-24'),
('Zenyatta', 'Support', 'Transcendence', 'Orb of Discord', 'Orb of Harmony', '2016-05-24');



delimiter $$
Create procedure getUsers(IN usern VarChar(50))
begin
    select *
	from users
    where userName = usern;
    end$$
    
delimiter ;

delimiter $$
Create procedure getChamps(IN champion VarChar(50))
begin
    select *
	from champions
    where champion_name = champion;
    end$$
    
delimiter ;

delimiter $$
Create procedure getHeros(IN heron VarChar(50))
begin
    select *
	from owheros
    where hero_name = heron;
    end$$
    
delimiter ;

delimiter $$
Create procedure getChampStats(IN championName VarChar(50))
begin
    select *
	from lolchampstats
    where champion = championName;
    end$$
    
    delimiter ;
    
    delimiter $$
Create procedure getUserStats(IN var_user VarChar(50))
begin
    select *
	from loluserstats
    where username = var_user;
    end$$
    
    delimiter ;

delimiter $$
Create procedure initialize_champ_stats(champ VarChar(50), lne VarChar(50))
begin
	declare tdeaths INT default 0;
    declare tassists INT default 0;
	declare tkills INT default 0;
    declare wins INT default 0;
    declare losses INT default 0;
    declare precense INT default 0;
    set tkills = (select coalesce(sum(kills), 0) from lolmatch where lolmatch.champion = champ and lolmatch.lane = lne);
    set tdeaths = (select coalesce(sum(deaths), 0) from lolmatch where lolmatch.champion = champ and lolmatch.lane = lne);
    set tassists = (select coalesce(sum(assists), 0) from lolmatch where lolmatch.champion = champ and lolmatch.lane = lne);
    set wins = (select count(*) from lolmatch where champion = champ and lane = lne and result = 'W');
    set losses = (select count(*) from lolmatch where champion = champ and lane = lne and result = 'L');
    set precense = (select count(*) from lolchampstats where champion = champ and lane = lne);
    IF precense > 0
    THEN
    update lolchampstats set totkills = tkills, totdeaths = tdeaths, totassists = tassists, totwins = wins, totlosses = losses
    where (champion, lane) = (champ, lne);
    ELSE
    Insert into lolchampstats (champion, lane, totkills, totdeaths, totassists, totwins, totlosses) values
    (champ, lne, tkills, tdeaths, tassists, wins, losses);
    end if;
    end$$
delimiter ;

delimiter $$
Create procedure initialize_user_stats(var_user VarChar(50), champ VarChar(50))
begin
	declare tdeaths INT default 0;
    declare tassists INT default 0;
	declare tkills INT default 0;
    declare wins INT default 0;
    declare losses INT default 0;
    declare precense INT default 0;
    declare tottows INT default 0;
    declare isuser INT default 0;
    set tkills = (select coalesce(sum(kills), 0) from lolmatch where champion = champ and lolmatch.username = var_user);
    set tdeaths = (select coalesce(sum(deaths), 0) from lolmatch where lolmatch.champion = champ and lolmatch.username = var_user);
    set tassists = (select coalesce(sum(assists), 0) from lolmatch where lolmatch.champion = champ and lolmatch.username = var_user);
    set wins = (select count(*) from lolmatch where lolmatch.champion = champ and lolmatch.username = var_user and result = 'W');
    set losses = (select count(*) from lolmatch where lolmatch.champion = champ and lolmatch.username = var_user and result = 'L');
    set precense = (select count(*) from loluserstats where champion = champ and username = var_user);
    set tottows = (select coalesce(sum(towersDestroyed), 0) from lolmatch where lolmatch.champion = champ and lolmatch.userName = var_user);
    set isuser = (select count(*) from users where users.userName = var_user);
    IF precense > 0 and isuser > 0
    THEN
    update loluserstats set totkills = tkills, totdeaths = tdeaths, totassists = tassists, totwins = wins, totlosses = losses, tottowersDestroyed = tottows
    where (username, champ) = (var_user, champ);
    ELSEif isuser > 0
    then
    Insert into loluserstats (username, champion, totkills, totdeaths, totassists, tottowersDestroyed, totwins, totlosses) values
    (var_user, champ, tkills, tdeaths, tassists, tottows, wins, losses);
    end if;
    end$$
delimiter ;


delimiter $$
Create procedure initialize_ow_stats(var_hero VarChar(50), var_user VarChar(50))
begin
	declare tdeaths INT default 0;
	declare tkills INT default 0;
    declare wins INT default 0;
    declare losses INT default 0;
    declare precense INT default 0;
    declare totmeds INT default 0;
    declare isuser INT default 0;
    set tkills = (select coalesce(sum(eliminations), 0) from owmatch where hero = var_hero and username = var_user);
    set tdeaths = (select coalesce(sum(deaths), 0) from owmatch where hero = var_hero and username = var_user);
    set wins = (select count(*) from owmatch where hero = var_hero and username = var_user and result = 'W');
    set losses = (select count(*) from owmatch where hero = var_hero and username = var_user and result = 'L');
    set precense = (select count(*) from owuserstats where hero = var_hero and username = var_user);
    set totmeds = (select coalesce(sum(medals), 0) from owmatch where hero = var_hero and username = var_user);
    set isuser = (select count(*) from users where users.userName = var_user);
    IF precense > 0 and isuser > 0
    THEN
    update owuserstats set elims = tkills, deaths = tdeaths, totwins = wins, totlosses = losses, medals = totmeds
    where (username, hero) = (var_user, hero);
    ELSEif isuser > 0
    then
    Insert into owuserstats (username, hero, elims, deaths, medals, totwins, totlosses) values
    (var_user, var_hero, tkills, tdeaths, totmeds, wins, losses);
    end if;
    end$$
delimiter ;


delimiter $$
Create procedure delete_hero_data(IN heron VarChar(50))
begin
    delete
	from owuserstats
    where hero = heron;
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_owuser_data(var_user VarChar(50))
begin
    delete
	from owuserstats
    where username = var_user;
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_userhero_data(heron VarChar(50), var_user VarChar(50))
begin
    delete
	from owuserstats
    where hero = heron and username = var_user;
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_userchamp_data(champ VarChar(50), var_user VarChar(50))
begin
    delete
	from loluserstats
    where champion = champ and username = var_user;
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_champlane_data(champ VarChar(50), var_lane VarChar(50))
begin
    delete
	from lolchampstats
    where champion = champ and lane = var_lane;
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_lolmatch(var_mid INT)
begin
    delete
	from lolmatch
    where usermatchid = var_mid;
    end$$
    
delimiter ;

delimiter $$
Create procedure add_lolmatch(var_user VarChar(50), champ VarChar(50), var_kills INT, var_deaths INT, var_assists INT, tows INT, res VarChar(5), var_lane VarChar(50))
begin
    Insert into lolmatch (username, champion, kills, deaths, assists, towersDestroyed, result, lane) values
    (var_user, champ, var_kills, var_deaths, var_assists, tows, res, var_lane);
    end$$
    
delimiter ;


delimiter $$
Create procedure delete_owmatch(var_mid INT)
begin
    delete
	from owmatch
    where owusermatchid = var_mid;
    end$$
    
delimiter ;

delimiter $$
Create procedure add_owmatch(var_user VarChar(50), var_hero VarChar(50), var_lh INT, var_deaths INT, var_elims INT, mtype VarChar(30), var_meds INT, res VarChar(5))
begin
    Insert into owmatch (username, hero, lasthits, deaths, eliminations, gametype, medals, result) values
    (var_user, var_hero, var_lh, var_deaths, var_elims, mtype, var_meds, res);
    end$$
    
delimiter ;

delimiter $$
Create procedure delete_account(var_user VarChar(50))
begin
    delete from lolmatch where lolmatch.username = var_user;
    delete from loluserstats where loluserstats.username = var_user;
    delete from owmatch where owmatch.username = var_user;
    delete from owuserstats where owuserstats.username = var_user;
	delete
	from users
    where userName = var_user;
    end$$
    
delimiter ;

delimiter $$
Create procedure add_account(var_user VarChar(50), var_pass VarChar(50))
begin
    insert into users (UserName, pass) values
    (var_user, var_pass);
    end$$
    
delimiter ;

delimiter $$
Create procedure update_pass(var_user VarChar(50), var_pass VarChar(50))
begin
    update users set pass = var_pass
    where userName = var_user;
    end$$
    
delimiter ;


Create trigger lolcstats_after_delete
AFTER delete ON lolmatch
for each row
	call initialize_champ_stats(OLD.champion, OLD.lane);




Create trigger lolustats_after_delete
AFTER delete ON lolmatch
for each row
    call initialize_user_stats(OLD.username, old.champion);




Create trigger lolcstats_after_insert
AFTER insert ON lolmatch
for each row
	call initialize_champ_stats(new.champion, new.lane);




Create trigger lolustats_after_insert
AFTER insert ON lolmatch
for each row
    call initialize_user_stats(new.username, new.champion);




Create trigger owstats_after_delete
AFTER delete ON owmatch
for each row
	call initialize_ow_stats(old.hero, old.username);




Create trigger owstats_after_insert
AFTER insert ON owmatch
for each row
	call initialize_ow_stats(new.hero, new.username);
    



insert into lolmatch (username, champion, kills, deaths, assists, towersDestroyed, result, lane) values
('davy', 'Aatrox', 12, 3, 5, 5, 'W', 'Top'),
('alex', 'Master Yi', 2, 6, 5, 1, 'W', 'Mid'),
('ricky441', 'Annie', 2, 6, 5, 1, 'W', 'Support'),
('davy',  'Aatrox', 2, 3, 2, 0, 'L', 'Mid'),
('alex', 'Master Yi', 7, 6, 2, 1, 'W', 'Jungle'),
('ricky441',  'Annie', 2, 0, 5, 7, 'W', 'Mid'),
('davy', 'Ryze', 10, 4, 5, 5, 'W', 'Mid'),
('alex',  'Ryze', 2, 6, 5, 1, 'L', 'Mid'),
('ricky441', 'Annie', 2, 6, 5, 1, 'W', 'Mid'),
('alex', 'Aatrox', 5, 3, 2, 1, 'L', 'Top'),
('davy', 'Annie', 2, 0, 5, 7, 'W', 'Mid'),
('davy', 'Ryze', 14, 8, 5, 5, 'L', 'Mid'),
('alex', 'Ryze', 8, 6, 5, 1, 'L', 'Mid'),
('ricky441', 'Annie', 10, 2, 5, 1, 'W', 'Mid');


insert into owmatch (username, hero, lasthits, deaths, eliminations, gametype, medals, result) values
('davy', 'D VA', 12, 3, 17, 'Escort', 2, 'W'),
('davy', 'Tracer', 10, 8, 27, 'Escort', 3, 'W'),
('davy','Zenyatta', 3, 3, 34, 'Escort', 2, 'W'),
('davy', 'Zenyatta', 0, 3, 23, 'Escort', 2, 'L'),
('davy', 'D VA', 10, 3, 38, 'Escort', 3, 'W'),
('chris1337', 'D VA', 0, 3, 17, 'Escort', 0, 'L'),
('chris1337', 'D VA', 8, 3, 17, 'Escort', 1, 'L'),
('chris1337', 'Reaper', 12, 3, 37, 'Escort', 2, 'W'),
('chris1337', 'D VA', 8, 8, 17, 'Escort', 0, 'L'),
('chris1337', 'D VA', 16, 5, 38, 'Escort', 2, 'W'),
('chris1337', 'Mercy', 0, 3, 37, 'Escort', 1, 'W');

