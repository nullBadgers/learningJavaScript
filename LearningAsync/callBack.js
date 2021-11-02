let one = (call_two) => {
    console.log("step 1 complete, please call step 2");
    call_two()
}


let two = (call_one) => {
    console.log("step 2")
}

one(two)