const filter = { userEmail: userEmail };
await Users.update(filter, { $set: { doneRead: true } }, (err) => {
  console.log(err);
});
