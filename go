#!/bin/bash
rm -fr ~/.anakeen/dynacase-offline-client/*/startupCache
./dynacase-offline -jsconsole $*
