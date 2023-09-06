#!/usr/bin/bash

# passed by ovs-tcpdump (can't change)
interface_flag=$1
interface_name=$2
other_flag=$3
# passed by user (arbitrary)
filename=$4

(
    tcpdump -i $interface_name -w $filename -s0 -Uln &
    # REQUIRED: wait until tcpdump create file
    sleep 1
    tail -c +0 -f $filename | wireshark -o "gui.window_title:$filename" -k -i -
    # stop tcpdump on terminating wireshark
    kill %1
)
