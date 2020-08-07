#!/bin/sh

echo "
 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  _   __ _        ___   _  __ __   ___        __
 | | / /(_)___ _ / _ ) (_)/ // /  / _ \ ___  / /___  ___ _ ___ ___  ____
 | |/ // // _  // _  |/ // // /  / , _// -_)/ // -_)/ _  /(_-</ -_)/ __/
 |___//_/ \_,_//____//_//_//_/  /_/|_| \__//_/ \__/ \_,_//___/\__//_/
 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
"

# retrieve branch name
APPROVED_BRANCH="master"
CURRENT_BRANCH=$(git branch | sed -n '/\* /s///p')

if [ "$CURRENT_BRANCH" != "$APPROVED_BRANCH" ]; then
  echo "Release is currently possible only on '$APPROVED_BRANCH'! You are currently on '$CURRENT_BRANCH' branch!"
  exit
fi

# retrieve tags data
CURRENT_TAG=$(git describe --tags --match=v* --abbrev=0)
CURRENT_TAG_TMS=$(git log -1 --format=%ai v0010)
CURRENT_VERSION_NUMBER=${CURRENT_TAG#v}
NEW_VERSION_VERSION_NUMBER=$(expr $CURRENT_VERSION_NUMBER + 1)
NEW_TAG=$(printf "v%04d" $NEW_VERSION_VERSION_NUMBER)
CURRENT_COMMIT_MSG=$(git log -1 --pretty=%B)
CURRENT_TAG_COMMIT_MSG=$( git log -1 --pretty=%B $CURRENT_TAG)

echo "Current branch:          $CURRENT_BRANCH"
echo "Latest released Version: $CURRENT_TAG ($CURRENT_TAG_COMMIT_MSG at $CURRENT_TAG_TMS)"
echo "The next Version:        $NEW_TAG ($CURRENT_COMMIT_MSG)"
echo
read -p "Do you want to proceed? The tag will be created and pushed [y]? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Creating the new tag ..."
    git tag $NEW_TAG
    echo "New tag '$NEW_TAG' has been created. Pushing the tag ..."
    git push origin $NEW_TAG
fi
