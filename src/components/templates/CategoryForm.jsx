import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addCategory } from '../../services/admin';

import styles from './CategoryForm.module.css';

function CategoryForm() {

  const queryClient=useQueryClient();
    const [form,setForn]=useState({name:"",slug:"",icon:""});

    const {mutate , isLoading , error , data}=useMutation(addCategory,{
      onSuccess:()=>queryClient.invalidateQueries("get-categories"),
    });
    console.log({isLoading , error , data});

    const changeHandler=(event)=>{
        setForn({...form,[event.target.name]:event.target.value})
    }
    const submitHandler=(event)=>{
        event.preventDefault();

        if(!form.name || !form.slug || !form.icon)return;
        mutate(form)
        console.log(form)
    }
  return (
    <form onChange={changeHandler} onSubmit={submitHandler} className={styles.form}>
        <h3>دسته بندی جدید</h3>
        {!!error && <p>مشکلی پیش امده است</p>}
        {data?.status===201 &&<p>دسته بندی با موفقیت اضافه شد</p>}
        <label htmlFor="name">اسم دسته بندی</label>
        <input type="text" name='name' id='name'/>
        <label htmlFor="slug">اسلاگ</label>
        <input type="text" name='slug' id='slug' />
        <label htmlFor="icon">آیکون</label>
        <input type="text" name='icon' id='icon'/>
        <button type='submit' disabled={isLoading}>ایجاد</button>
    </form>
  )
}

export default CategoryForm