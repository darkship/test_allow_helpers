
collections= new Mongo.Collection("items1",{
  transform: function (doc) {
    doc.test=function(){
      console.log("hello from collection")
      };
      return doc; }
})


collections.deny({
insert: function() { return false },
update: function() { return false },
remove: function() { return false },
transform: null
})

collections.allow({
insert: function() { return true },
update: function(userId,doc) {
  doc.test()
  return false },
remove: function() { return false },
})


if (Meteor.isClient) {

    var id=collections.insert({title:"test"})
    collections.update(id,{$set:{updated:true}},function(err){
      if(err)
        {
          console.error("update failed with collection ")
          console.error(err)
        }
        else{
          console.log("update succeed with collection ")
        }
  })

}
