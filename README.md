# A3-S2-Pierre-feuille-ciseaux
Ce projet a été réalisé par Aurore Dimech et Brunic Feyou.

# Description 
Ce projet est un site internet dans lequel, face à une caméra l'utilisateur pourrait jouer à Pierre Feuille Ciseaux. Une fois le jeu commencé, le joueur à l'aide de ses doigts imite un objet soit une pierre, soit une feuille ou une paire de ciseaux. En fonction du signe, la caméra capture et interprète le signe de chaque joueur. Ansi, au tour de chaque joueur, le même scénario se produit et à la fin de chaque manche le nom du joueur gagnant est dévoilé. De plus, en bas de l'écran, un historique des manches avec l'objet joué de chacun est enregistré. 

# Fonctionnalités 
Les fonctionnalités de cette application sont : 
- **Détection des signes de la main** : En fonction du signe de la main que fait le joueur, la caméra intreprète puis détermine à la fin de la partie, le gagnant. Et cette action est suivie d'une autre qui enregistre dans l'historique, les jeux des joueurs par une illustration.
- **Système de tour** : Pour chaque joueur de la partie, il y'a un système de tour intégré qui permet de déterminer le joueur actuel. En fonction de l'utilisateur actif, le tour est respectivement pointé par les couleurs rouge et jaune.
- **Gestion des scores** : À la fin de chaque manche en fonction des signes joués par les deux joueurs des points leurs sont attribués et calculés au fur et à mesure. Si l'un des deux joueurs remporte une manche alors il obtient un plus de 1 point tandis que l'autre n'en n'obtient. 
- **Historique des manches** : Une fois une partie terminée, soit les deux joueurs ont joués chacun à leur tour, l'objet illustré par chacun des joueurs est stocké dans la fenêtre Historique en bas de la page de la page. Ceci ainsi de suite pour chaque manche. 
- **Cliquer sur un bouton "Enregistrer son coup"** : Avant d'être filmé et de capturer la pose de ses doigts, il y'a un bouton "Enregistrer son coup" sur lequel l'utilisateur devra cliquer avant de commencer son tour et jouer contre son adversaire. 
- **Affichage du gagant** : Entre chaque manche, une pop-up apparaît pour revéler le joueur gagnant.

# Installation 
- Cloner le projet.
- L'ouvrir dans un éditeur de code.
- Lancer un serveur en ligne (tel que Go Live)
- Accepter l'activation de la caméra demander par votre navigateur
- Profiter de l'expérience

# Fonctionalités futures
- **Pouvoir joueur sur deux ordinateurs** : une fois l'application connectéeé à un serveur distant, les deux joueurs, pour une meilleure expérience, joueraient sur un PC chacun.
- **Détection d'une main et capture de l'image** : une fois le tour du joueur suivant, pour éviter au joueur de cliquer sur bouton, l'IA pourrait simplement détectée la main et la direction de celle-ci.
- **Jouer sur le même ordinateur à deux en même temps** : Après le lancement d'un compte à rebours, les deux joeurs dévoileraient chacun leur signe, chacun en même temps et la caméra le prendrai en compte déterminerai le score du gagnant.
- **Pouvoir mettre un nombre de manche limitée** : Déterminer après combien de manche, les joueurs pourront s'arrêter et connaître le gagnant de la partie.
-  **Pouvoir recommencer la partie** : Une fois la partie finie ou pas cliquer sur un bouton qui remettra les scores et l'historique à plat. Celle-ci recommencera.

