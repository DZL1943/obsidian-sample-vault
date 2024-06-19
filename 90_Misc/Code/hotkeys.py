#! /usr/bin/env python
# -*- coding: UTF-8 -*-

"""
date: 2024/05/20
desc: 解析 obsidian hostkeys.json 文件
usage: python hotkeys.py ../../.obsidian
"""
import csv
import json
import logging
import pathlib
from pprint import pprint
import sys


log = logging.getLogger(__name__)


def load(obsidian_config_dir):
    hotkeys_path = obsidian_config_dir / "hotkeys.json"
    with open(hotkeys_path, "r") as f:
        hotkeys = json.load(f)
    return hotkeys

def resolve(data):
    results = []
    for k in data:
        results.append([
            k,
            "+".join([
                "+".join(data[k][0]["modifiers"]),
                data[k][0]["key"]
            ])
        ])
    results.sort(key=lambda x: x[0])
    return results

def output(data, outfile='out.csv'):
    with open(outfile, 'w', newline='') as f:
        writer = csv.writer(f, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerows(data)
    return outfile

def main():
    logfmt = '[%(asctime)s.%(msecs)03d|%(levelname)s:%(filename)s:%(funcName)s:%(lineno)d]%(message)s'
    logging.basicConfig(level=logging.DEBUG, format=logfmt, datefmt='%Z%Y/%m/%d@%H:%M:%S')
    
    obsidian_config_dir = pathlib.Path(sys.argv[1]) if len(sys.argv)>1 else pathlib.Path.cwd()
    log.debug(obsidian_config_dir)
    if not obsidian_config_dir.exists:
        raise

    data = load(obsidian_config_dir)

    r = resolve(data)
    #pprint(r)
    for e in r: print(f"{e[0]}\t{e[1]}")
    output(r)


if __name__ == "__main__":
    main()
    pass