git restore pnpm-lock.yaml
# print that we're pulling latest changes
echo "Pulling latest changes from git"

# pull latest changes
pull=$(git pull)

if [[ $pull == *"Already up to date."* ]]; then
	# quit bash script
	echo "No updates available"
fi

# print that we're installing dependencies
echo "Installing dependencies"

# install dependencies
pnpm install

# print that we're building
echo "Building"

# build
pnpm build

# print that we're restarting
echo "Restarting"

pm2 start ecosystem.config.cjs
