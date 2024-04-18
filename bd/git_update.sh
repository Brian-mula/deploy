#!/bin/bash
VERSION=""

#get parameters

while getopts "v:" flag
do
    case "${flag}" in 
        v) VERSION=${OPTARG};;
    esac
done

# get highest tag number

git fetch --prune --unshallow 2>/dev/null

CURRENT_VERSION=`git desccribe --abbrev=0 --tags 2>/dev/null`

if [[ $CURRENT_VERSION == "" ]]; then
    CURRENT_VERSION="v0.0.1"
fi
echo "Current version: $CURRENT_VERSION"

CURRENT_VERSION_PARTS=(${CURRENT_VERSION//./ })

# get current hash and see if it already has a tag

VNUM1=${CURRENT_VERSION_PARTS[0]}
VNUM2=${CURRENT_VERSION_PARTS[1]}
VNUM3=${CURRENT_VERSION_PARTS[2]}

if [[$VERSION == 'major']]
then
    VNUM1=$((VNUM1+1))
elif [[$VERSION == 'minor']]
then
    VNUM2=$((VNUM2+1))
elif [[$VERSION == 'patch']]
then
    VNUM3=$((VNUM3+1))
fi

NEW_TAG="v$VNUM1.$VNUM2.$VNUM3"
echo "($VERSION) Updating $CURRENT_VERSION to $NEW_TAG"

GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT 2>/dev/null`

if [ -z "$NEEDS_TAG" ]; then
    echo "Tagging $NEW_TAG"
    git tag $NEW_TAG
    git push --tags
    git push
else
    echo "Already a tag on this commit"
fi

echo ::set-output name=git-tag::$NEW_TAG

exit 0
   