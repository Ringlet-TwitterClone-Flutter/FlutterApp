package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Hashtag;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Hashtag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {}
