food = {
    "Tomyam Gung": ["soup", "spicy", "veg", "meat"],
    "Somtam": ["veg", "spicy"],
    "Pad-Thai": ["fry", "noodle", "veg", "meat"],
    "Kai-Jiew": ["fry", "egg", "meat"],
    "Kraprao": ["fry", "spicy", "meat"],
    "Fried rice": ["fry", "rice"],
    "Sukiyaki": ["soup", "veg", "meat"],
    "Fried egg": ["fry", "egg"],
    "Fried chicken": ["fry", "meat"]
}

# result = {}
# for key, value in food.items():
#     for v in value:
#         if v in result:
#             result[v].append(key)
#         else:
#             result[v] = [key]

# print(result)

for key, value in food.items():
    print(key + ':food.' + '.'.join(sorted(value)))


result = {
  "soup": [
    "Tomyam Gung",
    "Sukiyaki"
  ],
  "spicy": [
    "Tomyam Gung",
    "Somtam",
    "Kraprao"
  ],
  "veg": [
    "Tomyam Gung",
    "Somtam",
    "Pad-Thai",
    "Sukiyaki"
  ],
  "meat": [
    "Tomyam Gung",
    "Pad-Thai",
    "Kai-Jiew",
    "Kraprao",
    "Sukiyaki",
    "Fried chicken"
  ],
  "fry": [
    "Pad-Thai",
    "Kai-Jiew",
    "Kraprao",
    "Fried rice",
    "Fried egg",
    "Fried chicken"
  ],
  "noodle": [
    "Pad-Thai"
  ],
  "egg": [
    "Kai-Jiew",
    "Fried egg"
  ],
  "rice": [
    "Fried rice"
  ]
}