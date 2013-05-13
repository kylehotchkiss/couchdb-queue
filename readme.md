# couchdb-queue

For several of my projects, I realized that I had a common queue system based on CouchDB that ran on Heroku. A daemon of sorts. I thought very hard about the best way to approach such a task and found a good combination to handle a simple queue of changing objects. It works with multiple workers, doesn't waste requests to the CouchDB server, and offers a pretty easy interface to your data.

Before you give couchdb-queue a shot, please realize that you need to make sure you're standardizing things in your queue database in CouchDB. For example, all of your queue items should contain a title if your queue works from titles. couchdb-queue doesn't handle your data, it's just an interface, but this is for your own sanity :)

## Usage