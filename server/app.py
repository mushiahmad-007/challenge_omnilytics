# vim:fileencoding=utf-8
import json
import os
import sys
from flask import Flask, jsonify, abort, make_response, request, send_file
from flask_classy import FlaskView, route
from flask_cors import CORS
import random, string
import time
import uuid

root_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(root_dir)

from helpers import get_stats, generate_random_object
from config import server

app = Flask(__name__)
CORS(app)
app.task_id = 0


@app.route('/generate-file', methods=['GET'])
def generate_file():
    """
    Generates a 2MB file conatining random objects
    :return: json response with status code
    """
    try:
        unique_id = (str(time.time()) + str(uuid.uuid4())).replace('-', '').replace('.', '')[
                    0:20]  # 20 characters unique id with time stamp
        file_name = 'file_{}.txt'.format(unique_id)  # file name containing unique id
        file_uri = '/files/' + file_name
        file_abs_path = root_dir + file_uri
        with open(file_abs_path, 'w') as f:
            # Add random objects untill file size is 2MB
            while os.path.getsize(file_abs_path) <= 2000000:
                f.write(str(generate_random_object()) + ",")
            f.close()
        response = {
            "success": True,
            "download_link": server + ':5000/download' + file_uri,
            "stats_link": server + ':5000/stats' + file_uri,
        }
        return app.response_class(response=json.dumps(response), mimetype='application/json'), 200
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "INTERNAL_SERVER_ERROR",
        }
        return app.response_class(response=json.dumps(response), mimetype='application/json'), 500


@app.route('/download/<path:file_path>')
def download_file(file_path):
    """
    Downloads the file with path mentioned
    :param file_path: relative path of generated file
    :return: json response with status code
    """
    try:
        print("file path:" + str(file_path))
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "INTERNAL_SERVER_ERROR",
        }
        return app.response_class(response=json.dumps(response), mimetype='application/json'), 500


@app.route('/stats/<path:file_path>')
def get_file_stats(file_path):
    """
    generates states for file
    :param file_path: relative path of file
    :return: json response with status code
    """
    try:
        file_abs_path = root_dir + "/" + file_path
        stats = None
        with open(file_abs_path, 'r') as f:
            text = f.read()
            stats = get_stats(text.split(","))
            print(stats)
        response = {
            "success": True,
            "stats": stats
        }
        return app.response_class(response=json.dumps(response), mimetype='application/json'), 200
    except Exception as e:
        print(e)
        response = {
            "success": False,
            "message": "INTERNAL_SERVER_ERROR",
        }
        return app.response_class(response=json.dumps(response), mimetype='application/json'), 500


if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port=5000, use_reloader=True)
