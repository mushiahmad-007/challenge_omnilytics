import random, string


def generate_random_object():
    """
    Generates a random object from one of the following types:
    - Alphabet
    - Alphanumeric
    - Integers
    - Real Numbers
    :return: A random object
    """
    object_size = random.randint(1, 20)
    objects = [
        ''.join(random.choices(string.ascii_letters + string.digits, k=object_size)),  # alphanumeric
        ''.join(random.choices(string.ascii_letters, k=object_size)),  # alphabet
        random.randint(-10000000, 10000000),  # integer
        random.uniform(-10000000, 10000000)  # real numbers
    ]
    return objects[random.randint(0, 3)]


def get_stats(arr):
    """
    Generates stats of input array
    :param arr: Array containg random objects
    :return: Dictionary containing stats
    """
    stats = {
        'alphabets': 0,
        'real_numbers': 0,
        'integers': 0,
        'alphanumerics': 0
    }
    for obj in arr:
        if obj.isalpha():
            stats['alphabets'] += 1
            continue
        if obj.isalnum():
            stats['alphanumerics'] += 1
            continue
        try:
            int(obj)
            stats['integers'] += 1
            continue
        except ValueError as e:
            stats['real_numbers'] += 1
    return stats
