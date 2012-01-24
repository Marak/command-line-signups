## Install
Just install this package globally using npm.
You can clone de repo, and install it.

```
git clone git@github.com:Marak/command-line-signups.git
npm install -g ./command-line-signups
```

Now you can create a user in your system.
When you login with this user created, an interactive session starts.

## Usage
After install you can use the command `jitsu-shell` for run an interactive session with jitsu.
Need install jitsu CLI tool as global package. And Nodejs installed in normals prefix.

## How to add user using this
We will add the user *cronopio* to the system and within the group *nodeusers*
Remember add a password for the user.

```
useradd -s /usr/local/bin/jitsu-shell -m -g nodeusers cronopio
passwd cronopio
```