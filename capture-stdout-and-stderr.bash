#!/bin/bash

# We want to write to both stdout and stderr, but also log stdout and stderr.

# Space-delimited string of files to clone STDOUT and STDERR to.
STDOUT_REDIRECTS="std.out"
STDERR_REDIRECTS="std.err"

{
{

echo 1>&1 "This message is going to stdout."
echo 1>&2 "This message is going to stderr."

# Spaces excluded intentionally to enable redirection to multiple files
# Don't mess with the file descriptors unless you know what you're doing.
} 2>&1 1>&3 | tee ${STDERR_REDIRECTS} 1>&2
} 3>&1      | tee ${STDOUT_REDIRECTS} 3>&-
