#!/usr/bin/env bash
a=1
b=2
if [ $a ==  $b ]
  then
    echo "a 等于 b"
elif [ $a -gt $b ]
  then
    echo "a 小于"
else
  echo "没有符合的条件"
fi    
