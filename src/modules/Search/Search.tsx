import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import type { User } from "../../typescript/types";

import { selectSearch } from "../../redux/search/search-selectors";
import type { AppDispatch } from "../../redux/store";
import { findUsers } from "../../redux/search/search-thunks";
import {
  addRecent,
  clearResult,
  removeRecent,
} from "../../redux/search/search-slice";
import { hideModal } from "../../redux/modal/modal-slice";

import Info from "../../shared/components/Info/Info";

import { fields, searchSchema, type FormData } from "./fields";
import Card from "./UserCard/UserCard";

import styles from "./Search.module.css";

export default function Search() {
  const { loading, error, result, recent } = useSelector(selectSearch);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
    mode: "onChange",
  });

  const handleOnChange = async (values: unknown) => {
    dispatch(findUsers(values as User));
  };

  const handleOnResultClick = (user: User) => {
    reset();
    dispatch(addRecent(user));
    dispatch(clearResult());
    dispatch(hideModal());
  };
  
  const handleOnRemoveIconClick = (userId: number) => {
    dispatch(removeRecent(userId));
  };

  const foundedUsersElements = result.map((user) => (
    <Card key={user.id} user={user} onClick={handleOnResultClick} />
  ));

  const recentUsersElements = recent.map((user) => (
    <Card
      key={user.id}
      user={user}
      recent={true}
      onRemove={handleOnRemoveIconClick}
    />
  ));

  return (
    <form
      onChange={handleSubmit(handleOnChange)}
      onClick={(event) => {
        event.stopPropagation();
      }}
      className={styles.search}
    >
      <h1 className={styles.title}>Search</h1>
      <input
        {...register(fields.username.name as keyof FormData)}
        {...fields.username}
        className={styles.input}
      />
      {foundedUsersElements}
      <h2 className={styles.subTitle}>Recent</h2>
      {recentUsersElements}
      <Info error={errors.username?.message || error} loading={loading} />
    </form>
  );
}
