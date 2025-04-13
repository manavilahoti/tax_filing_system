from pprint import pprint
from form16_parser import build_parser

filepath = "/Users/manavilahoti/Desktop/1655725194_sampleform16.pdf"

parser = build_parser()
parsed = parser.parse(filepath, return_output=True)

pprint(parsed)