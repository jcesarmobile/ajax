/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        document.getElementById('fetch').addEventListener('click', function(evt){
            fetchTest();
        },false);
        document.getElementById('ajax').addEventListener('click', function(evt){
            ajax();
        },false);
        document.getElementById('clean').addEventListener('click', function(evt){
            document.getElementById("result").innerHTML = '';
        },false);
        document.getElementById('fetchp').addEventListener('click', function(evt){
            fetchTestp();
        },false);
        document.getElementById('ajaxp').addEventListener('click', function(evt){
            ajaxp();
        },false);
    }
};

function ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", "http://datos.gijon.es/doc/turismo/vinos-tapas.json", true);
    xhttp.send();
}

function ajaxp() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("result").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("POST", "https://erlus-scanner.orlyapps.de/api/login", true);
    xhttp.send("name=test&password=test");
}

function fetchTest() {
    if(window.fetch) {
        fetch('http://datos.gijon.es/doc/turismo/vinos-tapas.json').then(function(response) { 
            return response.json();
        }).then(function(result) {
            document.getElementById("result").innerHTML = JSON.stringify(result);
        }).catch(function(err) {
            document.getElementById("result").innerHTML = JSON.stringify(err);
        });
    } else {
        alert('unsuported');
    }
}

function fetchTestp() {
    if(window.fetch) {
        fetch('https://erlus-scanner.orlyapps.de/api/login', {
                                                             	method: 'post',
                                                             	body: JSON.stringify({
                                                             		name: 'testname',
                                                             		password: 'testpassord'
                                                             	})
                                                             	}).then(function(response) {
            return response.text();
        }).then(function(result) {
            document.getElementById("result").innerHTML = result;
        }).catch(function(err) {
            document.getElementById("result").innerHTML = JSON.stringify(err);
        });
    } else {
        alert('unsuported');
    }
}

app.initialize();