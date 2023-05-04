package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Hashtag;
import com.mycompany.myapp.repository.HashtagRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link HashtagResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class HashtagResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/hashtags";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HashtagRepository hashtagRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHashtagMockMvc;

    private Hashtag hashtag;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hashtag createEntity(EntityManager em) {
        Hashtag hashtag = new Hashtag().name(DEFAULT_NAME);
        return hashtag;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hashtag createUpdatedEntity(EntityManager em) {
        Hashtag hashtag = new Hashtag().name(UPDATED_NAME);
        return hashtag;
    }

    @BeforeEach
    public void initTest() {
        hashtag = createEntity(em);
    }

    @Test
    @Transactional
    void createHashtag() throws Exception {
        int databaseSizeBeforeCreate = hashtagRepository.findAll().size();
        // Create the Hashtag
        restHashtagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hashtag)))
            .andExpect(status().isCreated());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeCreate + 1);
        Hashtag testHashtag = hashtagList.get(hashtagList.size() - 1);
        assertThat(testHashtag.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createHashtagWithExistingId() throws Exception {
        // Create the Hashtag with an existing ID
        hashtag.setId(1L);

        int databaseSizeBeforeCreate = hashtagRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHashtagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hashtag)))
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = hashtagRepository.findAll().size();
        // set the field null
        hashtag.setName(null);

        // Create the Hashtag, which fails.

        restHashtagMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hashtag)))
            .andExpect(status().isBadRequest());

        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllHashtags() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Get all the hashtagList
        restHashtagMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hashtag.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        // Get the hashtag
        restHashtagMockMvc
            .perform(get(ENTITY_API_URL_ID, hashtag.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hashtag.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingHashtag() throws Exception {
        // Get the hashtag
        restHashtagMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();

        // Update the hashtag
        Hashtag updatedHashtag = hashtagRepository.findById(hashtag.getId()).get();
        // Disconnect from session so that the updates on updatedHashtag are not directly saved in db
        em.detach(updatedHashtag);
        updatedHashtag.name(UPDATED_NAME);

        restHashtagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHashtag.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
        Hashtag testHashtag = hashtagList.get(hashtagList.size() - 1);
        assertThat(testHashtag.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, hashtag.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hashtag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHashtagWithPatch() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();

        // Update the hashtag using partial update
        Hashtag partialUpdatedHashtag = new Hashtag();
        partialUpdatedHashtag.setId(hashtag.getId());

        partialUpdatedHashtag.name(UPDATED_NAME);

        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHashtag.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
        Hashtag testHashtag = hashtagList.get(hashtagList.size() - 1);
        assertThat(testHashtag.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void fullUpdateHashtagWithPatch() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();

        // Update the hashtag using partial update
        Hashtag partialUpdatedHashtag = new Hashtag();
        partialUpdatedHashtag.setId(hashtag.getId());

        partialUpdatedHashtag.name(UPDATED_NAME);

        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHashtag.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHashtag))
            )
            .andExpect(status().isOk());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
        Hashtag testHashtag = hashtagList.get(hashtagList.size() - 1);
        assertThat(testHashtag.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, hashtag.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hashtag))
            )
            .andExpect(status().isBadRequest());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHashtag() throws Exception {
        int databaseSizeBeforeUpdate = hashtagRepository.findAll().size();
        hashtag.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHashtagMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(hashtag)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Hashtag in the database
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHashtag() throws Exception {
        // Initialize the database
        hashtagRepository.saveAndFlush(hashtag);

        int databaseSizeBeforeDelete = hashtagRepository.findAll().size();

        // Delete the hashtag
        restHashtagMockMvc
            .perform(delete(ENTITY_API_URL_ID, hashtag.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Hashtag> hashtagList = hashtagRepository.findAll();
        assertThat(hashtagList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
